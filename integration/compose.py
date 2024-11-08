#!/usr/bin/env python3

import typer
import os

import utils


def setup_typer_app(base_command: str):

    app = typer.Typer(no_args_is_help=True)

    @app.command()
    def build():
        os.system(f"{base_command} build")


    @app.command()
    def start():
        os.system(f"{base_command} up -d --no-recreate")


    @app.command()
    def stop():
        os.system(f"{base_command} down")


    @app.command()
    def rm_volume(
        name: str = typer.Option(
            None,
            help="volume name to remove",
            autocompletion=lambda: utils.extract_compose_volume_names(
                utils.extract_yaml_files_from_base_command(base_command),
                utils.extract_project_name_from_base_command(base_command)
            )
        )
    ):
        if name is None:
            typer.echo(f"Please specify a volume name to remove.")
            return
        # The rest
        confirmation = "Yes I am fully sure."
        result = typer.prompt(
            f"""Please write "{confirmation}" to perform the deletion of "{name}" volume"""
        )
        if result == confirmation:
            os.system(f"docker volume rm {name}")
        else:
            typer.echo("No command executed.")


    @app.command()
    def logs(
        name: str = typer.Option(
            None,
            help="service name to show logs of",
            autocompletion=lambda: utils.extract_compose_service_names(
                utils.extract_yaml_files_from_base_command(base_command)
            )
        )
    ):
        if name is None:
            os.system(f"{base_command} logs -f")
        else:
            os.system(f"{base_command} logs -f {name}")


    @app.command()
    def exec(
        name: str = typer.Option(
            None,
            help="service name to exec into",
            autocompletion=lambda: utils.extract_compose_service_names(
                utils.extract_yaml_files_from_base_command(base_command)
            )
        )
    ):
        if name is None:
            typer.echo(f"Please specify a service name to exec into.")
        else:
            os.system(f"{base_command} exec {name} bash")


    @app.command()
    def exec_root(
        name: str = typer.Option(
            None,
            help="service name to exec into",
            autocompletion=lambda: utils.extract_compose_service_names(
                utils.extract_yaml_files_from_base_command(base_command)
            )
        )
    ):
        if name is None:
            typer.echo(f"Please specify a service name to exec into.")
        else:
            os.system(f"{base_command} exec -u 0 {name} bash")


    @app.command()
    def get_ip(
        name: str = typer.Option(
            None,
            help="service name to get ip of",
            autocompletion=lambda: utils.extract_compose_service_names(
                utils.extract_yaml_files_from_base_command(base_command)
            )
        )
    ):
        # Determine end_part:
        if name is None:
            end_part = ""
        else:
            end_part = f" {name}"
        # Now use it:
        container_names = utils.check_output(
            f"{base_command} " + "ps --format '{{.Name}}'" + end_part).strip().split("\n")
        service_names = utils.check_output(
            f"{base_command} " + "ps --format '{{.Service}}'" + end_part).strip().split("\n")
        service_ports = utils.check_output(
            f"{base_command} " + "ps --format '{{.Ports}}'" + end_part).strip().split("\n")
        # Construct output:
        output = []
        for i, cn in enumerate(container_names):
            ip = utils.check_output(
                "docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' " + cn
            ).strip()
            output.append(f"{ip}\t\t{service_names[i]}\t\t{service_ports[i]}")
        # Print it:
        print("\n".join(output))


    @app.command()
    def stats():
        os.system(f"watch -c -n 1 -- {base_command} ps -a ;")


    return app