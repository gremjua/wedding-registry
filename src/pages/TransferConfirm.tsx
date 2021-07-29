import { Box, Container, Typography } from '@material-ui/core';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import UploadButton from 'components/upload/UploadButton';
import { GiftCartContext } from 'context/GiftCartContext';
import { TransactionContext } from 'context/TransactionContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TransferInfo from '../components/transfer/TransferInfo';

const TransferConfirm = (): JSX.Element => {
	const { getTransaction, clearTransaction, storeTransaction } =
		useContext(TransactionContext);
	const { clearCart } = useContext(GiftCartContext);
	const [transactionId, setTransactionId] = useState<string>();
	const [amount, setAmount] = useState<number>();
	const voucherRef = useRef<HTMLButtonElement>(null);
	const currentTransaction = getTransaction();

	useEffect(() => {
		if (currentTransaction) {
			storeTransaction(currentTransaction)
				.then(id => {
					console.log('transaction ID', id);
					setTransactionId(id);
					setAmount(currentTransaction.amount);
					clearTransaction();
					clearCart(); // TODO: snackbar, "confirmaste tu regalo :tada: Solo falta que transfieras el dinero y subas el comprobante"
				}) // TODO: send email in background, maybe vercel function
				.catch(e => console.error(e)); // TODO: render error
		}
		return () => {
			setTransactionId(undefined);
			setAmount(undefined);
		};
	}, []);
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				{transactionId ? (
					<>
						<Box my='10px'>
							<Typography variant='h6' align='center' gutterBottom>
								&#127881; ¡Confirmaste tu regalo! &#127881;
							</Typography>
							<Typography variant='body1' align='left' gutterBottom>
								El ID de tu regalo es: <b>{transactionId}</b>.<br />
								Hacé la transferencia de <b>${amount}</b> y recordá subir el comprobante
								haciendo click más abajo.
								<br />
								También te enviamos un e-mail con el link donde podés subir el
								comprobante más tarde.
							</Typography>
						</Box>
						<Box my='10px'>
							<TransferInfo voucherRef={voucherRef} />
						</Box>
						<Box my='10px'>
							<UploadButton transactionId={transactionId} voucherRef={voucherRef} />
						</Box>
					</>
				) : (
					<Box
						my='10px'
						display='flex'
						flexDirection='column'
						justifyContent='center'
					>
						<Typography variant='h6' align='center' gutterBottom>
							Hubo un error al confirmar la transferencia o no hay transferencia a
							confirmar.
						</Typography>
						<ChooseGiftButton />
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default TransferConfirm;
