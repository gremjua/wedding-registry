import { Box, Container, Typography } from '@material-ui/core';
import UploadButton from 'components/upload/UploadButton';
import { CoupleContext } from 'context/CoupleContext';
import { TransactionContext, DBTransaction } from 'context/TransactionContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IParams {
	transactionId: string;
}

const Upload = (): JSX.Element | null => {
	const { transactionId } = useParams<IParams>();
	const { fetchTransaction } = useContext(TransactionContext);
	const { getCouple } = useContext(CoupleContext);
	const { id: coupleId } = getCouple() || { id: 'noCoupleId' };
	const [transactionDetails, setTransactionDetails] = useState<DBTransaction>();
	useEffect(() => {
		fetchTransaction(transactionId, coupleId)
			.then(transaction => {
				setTransactionDetails(transaction);
			})
			.catch(error => console.error(error));
	}, [transactionId]);
	// TODO: fix LOADING so it is on top of everything else in Page Container
	// TODO: add error message when the id is invalid when fetching transaction
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				{transactionDetails ? (
					<>
						<Box my='10px' data-cy='uploadPageTransactionInfo'>
							<Typography> ID de transacción: {transactionId}</Typography>
							<Typography>
								Monto: {`$${transactionDetails?.amount.toLocaleString('es-ar')}`}
							</Typography>
						</Box>
						{transactionDetails.status === 'pending' ? (
							<Box my='10px'>
								<UploadButton transactionId={transactionId} />
							</Box>
						) : (
							<Box my='10px'>
								<Typography>
									¡Ya se ha subido el comprobante! No es necesario volver a subirlo.
								</Typography>
							</Box> // TODO: agregar boton para volver a pagina principal
						)}
					</>
				) : (
					<Box my='10px'>
						<Typography>
							No encontramos una transacción con ID {transactionId}
						</Typography>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default Upload;
