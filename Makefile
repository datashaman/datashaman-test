ELEVENTY_FLAGS =
WEBPACK_FLAGS =

.PHONY = default build build-npm clean debug serve wip

default: serve

build:
	@echo "Build gulp assets"
	@gulp build
	@echo "Build webpack assets"
	@webpack $(WEBPACK_FLAGS)
	@echo "Build eleventy site"
	@eleventy $(ELEVENTY_FLAGS)

build-npm:
	cd node_modules/feed && npm install && npm run build

clean:
	@echo "Clean files"
	@gulp clean
	@rm -rf src/scripts/bundle.js _site

debug:
	DEBUG=Eleventy* concurrently "gulp watch" "webpack $(WEBPACK_FLAGS) --watch" "eleventy $(ELEVENTY_FLAGS) --serve"

serve:
	concurrently "gulp watch" "webpack $(WEBPACK_FLAGS) --watch" "eleventy $(ELEVENTY_FLAGS) --serve"

wip:
	git add .; git commit -m "wip"; git push
