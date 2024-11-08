#!/usr/bin/env python3

# fmt: off

import os, sys
sys.path.append(os.getcwd())

import typer
from compose import setup_typer_app

# fmt: on

app = typer.Typer(no_args_is_help=True)


app.add_typer(setup_typer_app("docker compose -p project_dev -f docker-compose.yml"), name="dev")
app.add_typer(setup_typer_app("docker compose -p project_staging -f docker-compose.yml"), name="staging")
app.add_typer(setup_typer_app("docker compose -p project_prod -f docker-compose.yml"), name="prod")


if __name__ == "__main__":
    app()
