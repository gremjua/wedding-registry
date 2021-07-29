import { Box, Container, Typography } from '@material-ui/core';
import UploadButton from 'components/upload/UploadButton';
import { TransactionContext, DBTransaction } from 'context/TransactionContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IParams {
	transactionId: string;
}

const Upload = (): JSX.Element | null => {
	const { transactionId } = useParams<IParams>();
	const { fetchTransaction } = useContext(TransactionContext);
	const [transactionDetails, setTransactionDetails] = useState<DBTransaction>();
	useEffect(() => {
		fetchTransaction(transactionId)
			.then(transaction => {
				setTransactionDetails(transaction);
			})
			.catch(error => console.error(error));
	}, [transactionId]);
	// TODO: fix LOADING so it is on top of everything else in Page Container
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				{transactionDetails ? (
					<>
						<Box my='10px'>
							<Typography> ID de transacción: {transactionId}</Typography>
							<Typography>
								Monto: {`$${transactionDetails?.amount.toLocaleString('es-ar')}`}
							</Typography>
						</Box>
						<Box my='10px'>
							<UploadButton transactionId={transactionId} />
						</Box>
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
