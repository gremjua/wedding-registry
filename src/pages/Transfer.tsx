import { Box, Button, Container, Typography } from '@material-ui/core';
import TransferInfo from 'components/transfer/TransferInfo';
import { TransactionContext } from 'context/TransactionContext';
import React, { useContext, useState } from 'react';

const Transfer = (): JSX.Element => {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [isError, setIsError] = useState(false);
	const { getTransaction, storeTransaction } = useContext(TransactionContext);
	const transaction = getTransaction();
	const confirmTransfer = () => {
		if (transaction) {
			setIsConfirmed(true);
			storeTransaction(transaction)
				.then(id => console.log('transaction ID', id)) // TODO: send email in background, maybe vercel function
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
						<Box my='10px'>
							<Typography variant='body1' gutterBottom>
								Te vamos a pedir que hagas una transferencia desde tu homebanking y
								después subas el comprobante.
								<br />
								Si estás de acuerdo, presioná <b>Confirmá</b>. Se mostrarán los datos de
								la cuenta a la cual tenés que transferir.
							</Typography>
						</Box>
						<Box my='10px'>
							{!isConfirmed ? (
								<Button
									variant='contained'
									color='primary'
									onClick={() => confirmTransfer()}
								>
									Confirmá
								</Button>
							) : (
								<TransferInfo />
							)}
						</Box>
					</>
				) : null}
				{/* TODO: render No data, button to go to home */}
			</Box>
		</Container>
	);
};

export default Transfer;
