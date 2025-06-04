from pathlib import Path

import setuptools

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="streamlit-copy-to-clipboard",
    version="1.0.0",
    author="Sam Sze",
    author_email="mingsum.sam@gmail.com",
    description="A Streamlit copy-to-clipboard button component that respects the streamlit page styles.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/samsze0/streamlit-copy-to-clipboard",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=[
        "streamlit >= 0.63",
    ],
    extras_require={
        "devel": [
            "wheel",
            "pytest==7.4.0",
            "playwright==1.48.0",
            "requests==2.31.0",
            "pytest-playwright-snapshot==1.0",
            "pytest-rerunfailures==12.0",
        ]
    },
)
