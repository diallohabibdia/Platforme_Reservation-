import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Myheader from "@/components/myheader/Myheader";
import Myfooter from "@/components/myfooter/Myfooter";


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Bonjour !",
	description: "Ici une nouvelle description de notre app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div>
					<Myheader />
				</div>
				<div className="content">{children}</div>
				<div>
					<Myfooter />
				</div>
			</body>
		</html>
	);
}
