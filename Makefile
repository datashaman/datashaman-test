ELEVENTY_FLAGS =
WEBPACK_FLAGS =

.PHONY = default build build-npm clean debug serve wip

default: serve

build: clean
	cp -a node_modules/slick-carousel/slick/ src/
	cp node_modules/picnic/picnic.min.css src/styles
	cp src/_styles/custom.css src/styles
	webpack $(WEBPACK_FLAGS)
	eleventy $(ELEVENTY_FLAGS)

build-npm:
	cd node_modules/feed && npm install && npm run build

clean:
	rm -rf src/styles/* src/scripts/* _site

debug:
	DEBUG=Eleventy* eleventy $(ELEVENTY_FLAGS) --serve

serve:
	concurrently "webpack $(WEBPACK_FLAGS) --watch" "eleventy $(ELEVENTY_FLAGS) --serve"

wip:
	git add .; git commit -m "wip"; git push
