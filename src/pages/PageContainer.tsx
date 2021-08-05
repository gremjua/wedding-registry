import React, { useContext, useEffect } from 'react';
import { GiftItemsContext } from 'context/GiftItemsContext';
import Loading from 'components/common/Loading';

const PageContainer = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const { fetchItems, isLoading, setIsLoading } = useContext(GiftItemsContext);
	useEffect(() => {
		setIsLoading(true);
		// TODO: use useParams to get couple slug (if possible), and fetch and store its ID. Then use it in transaction context.
		// probably need to add function in TransactionContext to set couple ID
		fetchItems().finally(() => {
			setIsLoading(false);
		});
	}, []);
	return <>{isLoading ? <Loading /> : children}</>;
};

export default PageContainer;
