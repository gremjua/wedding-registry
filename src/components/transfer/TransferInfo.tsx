import { Box, Button, Typography } from '@material-ui/core';
import { CoupleContext } from 'context/CoupleContext';
import React, { useContext, useEffect, useRef, useState } from 'react';

const TransferInfo = ({
	voucherRef,
}: {
	voucherRef: React.RefObject<HTMLButtonElement>;
}): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const couple = getCouple();
	const cbuRef = useRef<HTMLInputElement>(null);
	const [copySuccess, setCopySuccess] = useState('');
	useEffect(() => {
		voucherRef.current?.focus();
	}, []);
	const copyToClipboard = (_e: unknown) => {
		cbuRef.current?.select();
		document.execCommand('copy');
		voucherRef.current?.focus();
		setCopySuccess('Copiado');
	};
	return (
		<>
			<Typography gutterBottom variant='button' align='center'>
				Datos de la cuenta de {couple?.title}
			</Typography>
			<Typography variant='body2' align='left'>
				<b>
					<i>{couple?.bank.name}</i>
				</b>
				<br />
				<b>Número de CBU</b>:{' '}
				<input
					readOnly
					ref={cbuRef}
					value={couple?.bank.cbu}
					style={{ width: '172px', border: 'none' }}
				/>
				<br />
				<b>Alias de CBU</b>: {couple?.bank.alias}
				<br />
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
