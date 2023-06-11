import { toHTML } from "@portabletext/to-html";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import getContrast from "@/app/utility/colorContrast.js";

const sanityClient = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: "production",
	useCdn: false, // set to `true` to fetch from edge cache
	apiVersion: "2021-10-21",
	// token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

const imageBuilder = imageUrlBuilder(sanityClient);

const myPortableTextComponents = {
	types: {
		image: ({ value }) => {
			return `<img src="${imageBuilder.image(value.asset)}" alt="" />`;
		},
	},

	marks: {
		link: ({ children, value }) => `<a href="${value.href}" target="${value.blank ? "_blank" : "_self"}">${children}</a>`,
	},
};

export function portableTextToHtml(text) {
	return {
		__html: toHTML(text, { components: myPortableTextComponents }),
	};
}

export function resolveImage(source) {
	if (!source?.asset?._ref) {
		return undefined;
	}
	return imageBuilder?.image(source).url();
}

export function setBoxCopyStyle(item) {
	if (item.color?.hex) {
		let style = { background: item.color.hex };
		let lowContrast = getContrast(item.color.hex, "#000000") < getContrast(item.color.hex, "#ffffff") + 5; // +5 is a manual tweak to favour white text on dark backgrounds
		if (lowContrast) {
			style.color = "#ffffff";
		}
		return style;
	} else {
		return {};
	}
}
