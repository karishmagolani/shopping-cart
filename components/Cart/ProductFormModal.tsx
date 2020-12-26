import * as React from "react";
import { Button, Checkbox, Form, Header, Image, Input, Modal, Radio, Select, TextArea } from "semantic-ui-react";
import { useForm } from "react-hook-form";
export interface IProductFormModalProps {
	setOpen: any;
	open: boolean;
	onSubmit?: any;
	item?:any
}

export default function ProductFormModal(props: IProductFormModalProps) {
	const { setOpen, open, item } = props;
	const { register, handleSubmit, watch, errors, setValue } = useForm();

	const onSubmit = (data) => {
		console.log("data", data, errors);
		props.onSubmit(data);
		setOpen(false);
	};
	console.log("error", errors)
	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={<Button>Add New Product</Button>}
		>
			<Modal.Header>Add New Product</Modal.Header>
			<Modal.Content>
				<Form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
					<Form.Group widths="equal">
						{/* <Form.Field control={Input} label="First name" placeholder="First name" /> */}
						<Form.Input
							fluid
							label="Product Name"
							placeholder="Product Name"
							error={
								errors.product_name && {
									content: "Please enter a valid Product Name",
									// pointing: "below",
								}
							}
						>
							<input
								name="product_name"
								ref={register({
									required: true,
								})}
								defaultValue={item && item.product_name}
							/>
						</Form.Input>
						{/* <Form.Field control={Input} label="Last name" placeholder="Last name" /> */}
						<Form.Input
							fluid
							label="Price"
							placeholder="Price"
							error={
								errors.product_price && {
									content: "Please enter a valid Price",
									// pointing: "below",
								}
							}
						>
							<input
								name="product_price"
								ref={register({
									required: true,
								})}
								type="number"
								defaultValue={item && item.product_price}
								
							/>
						</Form.Input>
						<Form.Input
							fluid
							label="Quantity"
							placeholder="Quantity"
							error={
								errors.product_qty && {
									content: "Please enter a valid Quantity",
									// pointing: "below",
								}
							}
						>
							<input
								name="product_qty"
								ref={register({
									required: true,
									// pattern: /[0-9]/
								})}
								type="number"

								defaultValue={item && item.product_qty}

							/>
						</Form.Input>
						{/* <Form.Field control={Select} label="Gender" options={options} placeholder="Gender" /> */}
					</Form.Group>
		
					<Form.Button positive type="submit" content="Add Product" />
					{/* </Form.Field> */}
				</Form>
			</Modal.Content>
			{/* <Modal.Actions>
				<Button color="black" onClick={() => setOpen(false)}>
					Nope
				</Button>
				<Button
					content="Yep, that's me"
					labelPosition="right"
					icon="checkmark"
					onClick={() => setOpen(false)}
					positive
				/>
			</Modal.Actions> */}
		</Modal>
	);
}
