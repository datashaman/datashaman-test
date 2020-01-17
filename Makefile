ELEVENTY_FLAGS =

serve:
	eleventy $(ELEVENTY_FLAGS) --serve

debug:
	DEBUG=Eleventy* eleventy $(ELEVENTY_FLAGS) --serve

build:
	# cd node_modules/feed && npm install && npm run build
	cp node_modules/purecss/build/* src/styles
	eleventy $(ELEVENTY_FLAGS)

deploy-wip:
	git add .; git commit -m "wip"; git push
