import Image from "next/image";
import { getData } from "@/app/utility/sanityData";
import { portableTextToHtml, resolveImage, setBoxCopyStyle } from "@/app/utility/contentTransforms";

export default async function Home() {
	const { homepage } = await getData();
	const boxes = homepage[0].boxes;
	// console.log(home.boxes);

	return (
		<>
			<div className="hero">
				<video className="hero-video" src="images/dohi_hero3.mp4" muted playsInline autoPlay loop></video>
			</div>

			<div className="box-grid">
				{boxes.map((item: any) => (
					<div className="grid-row" key={item._key}>
						<div className="grid-col u-copy-body" style={setBoxCopyStyle(item)}>
							<h2 className="u-caps">{item.title}</h2>
							<div dangerouslySetInnerHTML={portableTextToHtml(item.body)}></div>
						</div>
						<div className="grid-col col-image">
							<img className="bgimage" src={resolveImage(item.image[0])} alt="" />
						</div>
					</div>
				))}
			</div>
		</>
	);
}
