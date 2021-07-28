import { Box, Button, Container, Typography } from '@material-ui/core';
import TransferInfo from 'components/transfer/TransferInfo';
import { GiftCartContext } from 'context/GiftCartContext';
import { TransactionContext } from 'context/TransactionContext';
import React, { useContext, useState } from 'react';

const Transfer = (): JSX.Element => {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [isError, setIsError] = useState(false);
	const { getTransaction, storeTransaction } = useContext(TransactionContext);
	const { clearCart } = useContext(GiftCartContext);
	const transaction = getTransaction();
	const confirmTransfer = () => {
		if (transaction) {
			setIsConfirmed(true);
			storeTransaction(transaction)
				.then(id => {
					console.log('transaction ID', id);
					clearCart(); // TODO: snackbar, "confirmaste tu regalo :tada: Solo falta que transfieras el dinero y subas el comprobante"
				}) // TODO: send email in background, maybe vercel function
				.catch(e => setIsError(true)); // TODO: render error
		}
	};
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				{transaction ? (
					<>
						<Box my='10px'>
							<Typography variant='h5'>{`Monto: $ ${transaction?.amount}`}</Typography>
						</Box>
						{!isConfirmed ? (
							<>
								<Box my='10px'>
									<Typography variant='body1' gutterBottom>
										Te vamos a pedir que hagas una transferencia desde tu homebanking y
										después subas el comprobante.
										<br />
										Si estás de acuerdo, hacé click en <b>CONFIRMÁ</b>. Se mostrarán los
										datos de la cuenta a la cual tenés que transferir.
									</Typography>
								</Box>
								<Box my='10px'>
									<Button
										variant='contained'
										color='primary'
										onClick={() => confirmTransfer()}
									>
										Confirmá
									</Button>
								</Box>
							</>
						) : (
							<>
								<Box my='10px'>
									<Typography variant='h6' align='center' gutterBottom>
										&#127881; ¡Confirmaste tu regalo! &#127881;
									</Typography>
									<Typography variant='body1' align='center' gutterBottom>
										Hacé la transferencia y recordá subir el comprobante haciendo click
										más abajo.
										<br />
										También te enviamos un e-mail con el link donde podés subir el
										comprobante.
									</Typography>
								</Box>
								<Box my='10px'>
									<TransferInfo />
								</Box>
							</>
						)}
					</>
				) : null}
				{/* TODO: render No data, button to go to home */}
			</Box>
		</Container>
	);
};

export default Transfer;
