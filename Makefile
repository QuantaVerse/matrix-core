# Global variables

# echo _FormatCode_ guide:
# 	0 	Reset all styles
# 	1	Bold
#	32 	Green
#	34 	Blue
#	35 	Magenta
#	36	Cyan
RESET_STYLES=\033[0m
BOLD_BLUE=\033[1m\033[34m
BOLD_CYAN=\033[1m\033[36m

# .PHONY defines parts of the makefile that are not dependant on any specific file
# This is most often used to store functions
.PHONY = all help setup clean wipe docker-setup docker-stop docker-wipe

# Defines the default target that `make` will to try to make, or in the case of a phony target, execute the specified commands
# This target is executed whenever we just type `make`
.DEFAULT_GOAL = help

# The @ makes sure that the command itself isn't echoed in the terminal
help:
	@echo "$(BOLD_BLUE)-----------------------------MAKE GUIDE----------------------------$(RESET_STYLES)"
	@echo "$(BOLD_CYAN)make setup$(RESET_STYLES) : Setup development environment"
	@echo "$(BOLD_CYAN)make clean$(RESET_STYLES) : Clean up development environment"
	@echo "$(BOLD_CYAN)make wipe$(RESET_STYLES) : Wipe data from development environment"
	@echo "$(BOLD_CYAN)make docker-setup$(RESET_STYLES) : Setup docker images"
	@echo "$(BOLD_CYAN)make docker-stop$(RESET_STYLES) : Clean docker images"
	@echo "$(BOLD_CYAN)make docker-wipe$(RESET_STYLES) : Wipe docker data"
	@echo "$(BOLD_BLUE)-------------------------------------------------------------------$(RESET_STYLES)"

setup: #: Setup development environment and start docker
	@echo "\n$(BOLD_CYAN)Initializing development environment$(RESET_STYLES) 🏁️️️ "
	@echo "\n$(BOLD_CYAN)Checking env file$(RESET_STYLES) "
	@sh scripts/dev/init_env.sh
	@echo "\n$(BOLD_CYAN)Checking npm version and installing dependencies$(RESET_STYLES) "
	@sh scripts/dev/init_npm.sh
	@make docker-setup
	@echo "\n$(BOLD_CYAN)Building project locally$(RESET_STYLES) "
	@npm run build
	@echo "\n$(BOLD_CYAN)Local environment is setup for development$(RESET_STYLES) 🏳️️️️ \n"

clean: #: Clean up and stop docker
	@echo "\n$(BOLD_CYAN)Cleaning up environment$(RESET_STYLES) ❄️ "
	@echo "\n$(BOLD_CYAN)Clean dist$(RESET_STYLES) "
	@rm -rf dist
	@echo "\n$(BOLD_CYAN)Clean node_modules$(RESET_STYLES) "
	@rm -rf node_modules
	@echo "\n$(BOLD_CYAN)Clean logs$(RESET_STYLES) "
	@cd logs && find . \! -name "sample.log" -delete
	@make docker-stop
	@echo "\n$(BOLD_CYAN)Local environment is neat & clean$(RESET_STYLES) 💫️ \n"

wipe: #: Clean & Wipe all data & Wipe all docker data
	@echo "\n$(BOLD_CYAN)Wipe all data in environment: POTENTIALLY DANGEROUS$(RESET_STYLES) 🚿"
	@make clean
	@echo "\n$(BOLD_CYAN)Clean .env file$(RESET_STYLES) "
	@rm -f .env
	@make docker-wipe
	@echo "\n$(BOLD_CYAN)Local data is flushed$(RESET_STYLES) 👍 \n"

docker-setup:
	@echo "\n$(BOLD_CYAN)Composing docker project for TimescaleDB$(RESET_STYLES) "
	@cd docker/timescale && docker-compose build && docker-compose -p matrix-core-timescale up --remove-orphans --detach

docker-stop:
	@echo "\n$(BOLD_CYAN)Clean docker projects$(RESET_STYLES) "
	@sh scripts/dev/docker_clean.sh

docker-wipe:
	@echo "\n$(BOLD_CYAN)Wipe docker volumes$(RESET_STYLES) "
	@sh scripts/dev/docker_wipe.sh
