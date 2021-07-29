import { Box, Button, Container, Typography } from '@material-ui/core';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import { TransactionContext } from 'context/TransactionContext';
import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Transfer = (): JSX.Element => {
	// const [isError, setIsError] = useState(false);
	const { getTransaction } = useContext(TransactionContext);
	const transaction = getTransaction();
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
								Si estás de acuerdo, hacé click en <b>CONFIRMÁ</b>. Se mostrarán los
								datos de la cuenta a la cual tenés que transferir.
							</Typography>
						</Box>
						<Box my='10px'>
							<Button
								component={RouterLink}
								to='/transfer/confirm'
								variant='contained'
								color='primary'
							>
								Confirmá
							</Button>
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
							No tenemos datos para hacer una transferencia.
						</Typography>
						<ChooseGiftButton />
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default Transfer;
