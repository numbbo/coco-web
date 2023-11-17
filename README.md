# coco-web

Next iteration of the COCO website

## Build environment

We use [Quarto](https://quarto.org) version 1.3.450 to build the site. 
In addition, `env.yaml` contains a conda environment definition that is loaded before the site is built.

To setup the environment on your local machine, run

```sh
mamba env create -f env.yaml
```

in the root directory of the repository. 
If you've already created the environment and `env.yaml` has changed, run

```sh
mamba env update -f env.yaml --prune
```

There is no harm in running the above command once too often

## Previewing locally

To preview the site on your local machine, run

```sh
mamba activate coco-web
quarto preview
```

on your machine and open [http://localhost:4204](http://localhost:4204) in your browser.
