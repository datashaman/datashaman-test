ELEVENTY_FLAGS =
WEBPACK_FLAGS =

.PHONY = default build build-npm clean debug serve wip

default: serve

build:
	webpack $(WEBPACK_FLAGS)
	eleventy $(ELEVENTY_FLAGS)

build-npm:
	cd node_modules/feed && npm install && npm run build

clean:
	rm -rf src/scripts/bundle.js _site

debug:
	DEBUG=Eleventy* concurrently "webpack $(WEBPACK_FLAGS) --watch" "eleventy $(ELEVENTY_FLAGS) --serve"

lint:
	eslint scripts
	stylelint styles

serve:
	concurrently "gulp watch" "webpack $(WEBPACK_FLAGS) --watch" "eleventy $(ELEVENTY_FLAGS) --serve"

wip:
	git add .; git commit -m "wip"; git push
