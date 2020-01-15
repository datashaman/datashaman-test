ELEVENTY_FLAGS =

serve:
	eleventy $(ELEVENTY_FLAGS) --serve

debug:
	DEBUG=Eleventy* eleventy $(ELEVENTY_FLAGS) --serve

build:
	eleventy $(ELEVENTY_FLAGS)
