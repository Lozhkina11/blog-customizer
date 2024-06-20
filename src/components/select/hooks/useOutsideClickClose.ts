import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current?.contains(target);

			if (isOutsideClick) {
				onClose?.();
			}
		};
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('keydown', handleEscape);
		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onClose, onChange, isOpen, rootRef]);
};
