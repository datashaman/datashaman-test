ELEVENTY_FLAGS =

serve:
	eleventy $(ELEVENTY_FLAGS) --serve

debug:
	DEBUG=Eleventy* eleventy $(ELEVENTY_FLAGS) --serve

build:
	eleventy $(ELEVENTY_FLAGS)

deploy-wip:
	git add .; git commit -m "wip"; git push
