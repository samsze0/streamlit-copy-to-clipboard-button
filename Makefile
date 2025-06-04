.PHONY: dev
dev:
	DEV=true streamlit run streamlit_copy_to_clipboard_button/example.py

.PHONY: build
build:
	rm -rf dist
	rm -rf *.egg-info
	uv sync
	uv build

.PHONY: publish
publish:
	uv publish
