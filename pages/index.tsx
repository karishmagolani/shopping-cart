import Head from "next/head";
import { Container, Header } from "semantic-ui-react";
import CartContainer from "../components/Cart/CartContainer";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div >
			<Head>
				<title>Shopping Cart</title>
				<link rel="icon" href="/favicon.ico" />
			
			</Head>

			<Container >
				<Header as="h1" className={styles.title} block>Shopping Cart</Header>
				<CartContainer />
			</Container>
		</div>
	);
}
