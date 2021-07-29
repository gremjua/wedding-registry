import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';

const TransferInfo = ({
	voucherRef,
}: {
	voucherRef: React.RefObject<HTMLButtonElement>;
}): JSX.Element => {
	const cbuRef = useRef<HTMLInputElement>(null);
	const [copySuccess, setCopySuccess] = useState('');
	useEffect(() => {
		voucherRef.current?.focus();
	}, []);
	const copyToClipboard = (e: any) => {
		cbuRef.current?.select();
		document.execCommand('copy');
		voucherRef.current?.focus();
		setCopySuccess('Copiado');
	};
	return (
		<>
			<Typography gutterBottom variant='button' align='center'>
				Datos de la cuenta de Juan y Sol
			</Typography>
			<Typography variant='body2' align='left'>
				<b>
					<i>Banco Santander</i>
				</b>
				<br />
				<b>Tipo y número de cuenta</b>: Cuenta en Pesos 169-013821/9
				<br />
				<b>Número de CBU</b>:{' '}
				<input
					readOnly
					ref={cbuRef}
					value='0720169788000001382190'
					style={{ width: '172px', border: 'none' }}
				/>
				<br />
				<b>Alias de CBU</b>: VOLCAN.JARDIN.ABRIL
				<br />
				<b>Titular de la cuenta</b>: Gremes Cordero Juan Agustin
				<br />
				<b>Tipo y número de documento</b>: DNI 38028338
			</Typography>
			<Box my='10px'>
				<Button variant='contained' onClick={e => copyToClipboard(e)}>
					Copiá el CBU
				</Button>
				<span> {copySuccess}</span>
			</Box>
		</>
	);
};

export default TransferInfo;
