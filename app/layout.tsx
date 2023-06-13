import "@/app/styles/styles.scss";
import { getData } from "@/app/utility/sanityData";
import { Header } from "@/app/components/header";
import { Footer } from "./components/footer";

export const metadata = {
	title: "HP Centre",
	description: "",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { homepage } = await getData();
	const menu = homepage[0].MainMenu;

	return (
		<html lang="en">
			<body>
				<div className="page">
					<Header menuItems={menu} />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
