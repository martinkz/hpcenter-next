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
	// console.log(the_page._id);

	const isHaralanPage = the_page._id === "24650ce2-d6cf-474d-8123-70deb22d1dd6";
	const isDonatePage = the_page._id === "5fab18a4-5451-4a2b-835a-6f1036fade95";

	return (
		<>
			<div className="page-hero">
				<img className="hero-img" src="/images/page.jpg" alt="" />
				<h1 className="page-title">{the_page.title}</h1>
			</div>

			<div className="page-wrap">
				{isHaralanPage && <SimpleCarousel images={["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]} />}
				<div dangerouslySetInnerHTML={portableTextToHtml(the_page.body)}></div>
				{isDonatePage && (
					<div className="donate-wrap">
						<a href="https://donate.stripe.com/14k9Cv9kUf8zbGo7ss" target="_blank" className="btn btn-donate">
							<span>Donate Now</span>
							<small>Debit or Credit Card</small>
						</a>
					</div>
				)}
			</div>
		</>
	);
}
