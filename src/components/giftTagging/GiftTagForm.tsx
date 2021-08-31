import React, { useContext, useState } from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	Grid,
	InputAdornment,
	Typography,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import { Transaction, TransactionContext } from 'context/TransactionContext';
import { CoupleContext } from 'context/CoupleContext';
import { createMercadoPagoOrder } from 'net/mercadopago';

const initialValues = {
	tag: '',
	buyerName: '',
	email: '',
	amount: '',
};

const requiredValidation = (field: string, value: string): string | null => {
	if (typeof value === 'string') {
		return value.trim() === '' ? `${field} es requerido` : null;
	}
	return value ? null : `${field} es requerido`;
};

const nameValidation = (
	fieldName: string,
	fieldValue: string
): string | null => {
	if (/[^a-zA-Z -]/.test(fieldValue)) {
		return 'Caracteres inválidos';
	}
	if (fieldValue.trim().length < 3) {
		return `${fieldName} debe contener al menos tres caracteres`;
	}
	return null;
};

const emailValidation = (email: string): string | null => {
	if (
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		)
	) {
		return null;
	}
	return 'Por favor ingrese un email válido';
};

const numberValidation = (field: string, value: string): string | null =>
	typeof parseFloat(value) === 'number'
		? null
		: `El campo ${field} debe ser un número`;

const validate: { [index: string]: (name: string) => string | null } = {
	tag: (name?: string) => null,
	buyerName: (name: string) =>
		requiredValidation('Nombre', name) || nameValidation('Nombre', name),
	email: (email: string) =>
		requiredValidation('Email', email) || emailValidation(email),
	amount: (amount: string) =>
		requiredValidation('Monto', amount) || numberValidation('Monto', amount),
};

type PaymentMethod = 'mp' | 'tr';

type Props = {
	amount?: number;
};

const GiftTagForm = (props: Props): JSX.Element => {
	const { amount } = props;
	const history = useHistory();
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
	const { setTransaction } = useContext(TransactionContext);
	const { getCouple } = useContext(CoupleContext);
	const couple = getCouple();
	const validateForm = (values: any) => {
		const errors: { [index: string]: string } = Object.keys(values).reduce(
			(accErrors, field) => {
				const error = validate[field](values[field]);
				return {
					...accErrors,
					...(error && { [field]: error }),
				};
			},
			{}
		);
		return errors;
	};

	return (
		<Formik
			initialValues={{ ...initialValues, ...(amount && { amount }) }}
			validate={validateForm}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				setTransaction(values as Transaction);
				setSubmitting(false);
				if (couple?.slug) {
					if (paymentMethod === 'tr') {
						history.push(`/${couple.slug}/transfer`);
					} else if (paymentMethod === 'mp') {
						createMercadoPagoOrder(couple, values as Transaction)
							.then(url => {
								window.location.replace(url);
							})
							.catch(error => console.error(error));
					}
				}
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Field
								component={TextField}
								id='tag'
								name='tag'
								label='Dedicatoria'
								fullWidth
								multiline
								rows={5}
								variant='outlined'
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								required
								id='buyerName'
								name='buyerName'
								label='Tu nombre completo'
								fullWidth
								autoComplete='given-name'
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								required
								id='email'
								name='email'
								type='email'
								label='Tu email'
								fullWidth
								autoComplete='email'
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								required
								id='amount'
								name='amount'
								label='Monto'
								type='number'
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position='start'>AR$</InputAdornment>,
								}}
								disabled={!!amount}
							/>
						</Grid>
					</Grid>
					<Box
						padding='2em'
						display='flex'
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
					>
						<Typography variant='body1' gutterBottom>
							Elegí el método de pago:
						</Typography>
						<ButtonGroup
							orientation='vertical'
							color='primary'
							aria-label='vertical contained primary button group'
							variant='contained'
						>
							<Button
								color='primary'
								variant='contained'
								onClick={() => {
									setPaymentMethod('tr');
									submitForm();
								}}
								disabled={isSubmitting}
							>
								Transferencia bancaria
							</Button>
							{couple?.mp ? (
								<Button
									color='primary'
									variant='contained'
									onClick={() => {
										setPaymentMethod('mp');
										submitForm();
									}}
									disabled={isSubmitting}
								>
									Mercadopago
								</Button>
							) : null}
						</ButtonGroup>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default GiftTagForm;
