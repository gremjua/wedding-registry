import { Box, Button, Container, Typography } from '@material-ui/core';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import { CoupleContext } from 'context/CoupleContext';
import { TransactionContext } from 'context/TransactionContext';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Transfer = (): JSX.Element => {
	// const [isError, setIsError] = useState(false);
	const { getTransaction } = useContext(TransactionContext);
	const transaction = getTransaction();
	const { getCouple } = useContext(CoupleContext);
	const { slug } = getCouple() || {};
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				{transaction ? (
					<>
						<Box my='10px'>
							<Typography
								variant='h5'
								data-cy='transferPageAmountText'
							>{`Monto: $ ${transaction?.amount.toLocaleString('es-ar')}`}</Typography>
						</Box>
						<Box my='10px'>
							<Typography
								variant='body1'
								gutterBottom
								data-cy='transferPageInstructionsText'
							>
								Te vamos a pedir que hagas una transferencia desde tu homebanking y
								después subas el comprobante.
								<br />
								Si estás de acuerdo, hacé click en <b>CONFIRMAR</b>. Se mostrarán los
								datos de la cuenta a la cual tenés que transferir.
							</Typography>
						</Box>
						<Box my='10px'>
							<Button
								component={RouterLink}
								to={`/${slug}/transfer/confirm`}
								variant='contained'
								color='primary'
								data-cy='transferPageConfirmButton'
							>
								Confirmar
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
						<Typography
							variant='h6'
							align='center'
							gutterBottom
							data-cy='errorMsgNoTransferData'
						>
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
