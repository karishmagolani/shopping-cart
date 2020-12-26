import * as React from "react";
import { Button, Confirm, Header, Rating, Table } from "semantic-ui-react";
import ProductFormModal from "./ProductFormModal";
import remove from "lodash.remove";
export interface ICartContainerProps {}

export default function CartContainer(props: ICartContainerProps) {
	const [open, setOpen] = React.useState(false);
	const [products, setproducts] = React.useState([]);
	const [activeItem, setactiveItem] = React.useState(null);
	const [openConfirm, setOpenConfirm] = React.useState(false);
	const [total, settotal] = React.useState(0);

	const onRemove = (item) => {
		const _products = products;
		remove(_products, { product_name: item.product_name });
		setproducts([..._products]);
	};
	const onSubmit = (prod) => {
		const _products = products;
		if (activeItem) {
			onRemove(activeItem);
		}
		_products.push(prod);
		setproducts(_products);
	};

	React.useEffect(() => {
		let count = 0;
		products.map((item) => {
			count = count + item.product_price * item.product_qty;
		});
		settotal(count);
	}, [products]);

	console.log("products", products);
	return (
		<div>
			<ProductFormModal
				open={open}
				setOpen={(open) => {
					setactiveItem(null);
					setOpen(open);
				}}
				onSubmit={(prod) => {
					onSubmit(prod);
				}}
				item={activeItem}
			/>
			{products && products.length > 0 && (
				<Table celled padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell singleLine>Product Name</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Quantity</Table.HeaderCell>
							<Table.HeaderCell>Total</Table.HeaderCell>
							<Table.HeaderCell>Action</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					{products.map((item, index) => (
						<Table.Body>
							<Table.Row key={index}>
								<Table.Cell>
									<Header as="h2" textAlign="center">
										{item.product_name}
									</Header>
								</Table.Cell>
								<Table.Cell singleLine>{item.product_price}</Table.Cell>
								<Table.Cell textAlign="center">{item.product_qty}</Table.Cell>
								<Table.Cell textAlign="center">{item.product_price * item.product_qty}</Table.Cell>
								<Table.Cell>
									<Button
										content="Edit"
										icon="edit"
										labelPosition="right"
										onClick={() => {
											setactiveItem(item);
											setOpen(true);
										}}
									/>
									<Button content="Delete" icon="trash" labelPosition="right" onClick={() => setOpenConfirm(true)} />
									<Confirm
										confirmButton="Delete"
										size="mini"
										open={openConfirm}
										onCancel={() => setOpenConfirm(false)}
										onConfirm={() => onRemove(item)}
									/>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					))}
					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell />
							<Table.HeaderCell />

							<Table.HeaderCell>
								<Header as="h2" textAlign="center">
									Grand Total: {}
								</Header>
							</Table.HeaderCell>
							<Table.HeaderCell>
								{" "}
								<Header as="h2" textAlign="center">
									{total}
								</Header>{" "}
							</Table.HeaderCell>
							<Table.HeaderCell></Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			)}

			{/* < */}
		</div>
	);
}
