import { Box, Container, Typography } from '@material-ui/core';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import Loading from 'components/common/Loading';
import UploadButton from 'components/upload/UploadButton';
import { CoupleContext } from 'context/CoupleContext';
import { GiftCartContext } from 'context/GiftCartContext';
import { TransactionContext } from 'context/TransactionContext';
import { sendEmailToGifter } from 'net/email';
import React, { useContext, useEffect, useRef, useState } from 'react';
import TransferInfo from '../components/transfer/TransferInfo';

const TransferConfirm = (): JSX.Element => {
	const { getTransaction, clearTransaction, storeTransaction } =
		useContext(TransactionContext);
	const { clearCart } = useContext(GiftCartContext);
	const { getCouple } = useContext(CoupleContext);
	const couple = getCouple();
	const [transactionId, setTransactionId] = useState<string>();
	const [amount, setAmount] = useState<number>();
	const [isLoading, setIsLoading] = useState(false);
	const voucherRef = useRef<HTMLButtonElement>(null);
	const currentTransaction = getTransaction();

	useEffect(() => {
		if (currentTransaction && couple) {
			setIsLoading(true);
			storeTransaction(currentTransaction, couple.id)
				.then(id => {
					setTransactionId(id);
					setAmount(currentTransaction.amount);

					sendEmailToGifter(currentTransaction, id, couple).catch(e =>
						console.error(e)
					);

					clearTransaction();
					clearCart(); // TODO: snackbar, "confirmaste tu regalo :tada: Solo falta que transfieras el dinero y subas el comprobante"
				}) // TODO: send email in background, maybe vercel function
				.catch(e => console.error(e)) // TODO: render error
				.finally(() => setIsLoading(false));
		}
	}, []);
	return isLoading ? (
		<Loading />
	) : (
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
