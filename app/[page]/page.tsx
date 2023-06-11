import { getData } from "@/app/utility/sanityData";
import { portableTextToHtml } from "@/app/utility/contentTransforms";
import SimpleCarousel from "@/app/components/SimpleCarousel";

export const dynamicParams = false;

export async function generateStaticParams() {
	const { page } = await getData();
	return page.map((page: any) => ({ page: page.slug.current }));
}

export async function generateMetadata({ params }: { params: { page: string } }) {
	const { page } = await getData();
	const the_page = page.find((page: any) => page.slug.current === params.page);
	return {
		title: the_page.title,
	};
}

export default async function Page({ params }: { params: { page: string } }) {
	const { page } = await getData();
	const the_page = page.find((page: any) => page.slug.current === params.page);
	const isHaralanPage = the_page._id === "24650ce2-d6cf-474d-8123-70deb22d1dd6";

	return (
		<>
			<div className="page-hero">
				<img src="/images/page.jpg" alt="" />
				<h1 className="page-title">{the_page.title}</h1>
			</div>

			<div className="page-wrap">
				{isHaralanPage && <SimpleCarousel images={["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]} />}
				<div dangerouslySetInnerHTML={portableTextToHtml(the_page.body)}></div>
			</div>
		</>
	);
}
