import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { Text } from 'components/text';
import { Separator } from 'components/separator';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	setStatusPage: (newStatusPage: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setStatusPage,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [edition, setEdition] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onChange: () => setIsOpen(false),
	});

	const handleArrowClick = () => {
		setIsOpen(!isOpen);
	};

	const updateArticleState = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setEdition((prev) => ({
			...prev,
			[key]: option,
		}));
	};

	const onSubmitInfo = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	// const handleReset = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	setEdition(defaultArticleState);
	// 	// onReset();
	// };
	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setStatusPage(defaultArticleState);
		// onReset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={handleArrowClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={onSubmitInfo}
					onReset={handleReset}>
					<Text weight={800} size={31} align='left' uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={edition.fontFamilyOption}
						onChange={(option) =>
							updateArticleState('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='size_button'
						title='Размер шрифта'
						selected={edition.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => updateArticleState('fontSizeOption', option)}
					/>
					<Select
						title='Цвет шрифта'
						selected={edition.fontColor}
						options={fontColors}
						onChange={(option) => updateArticleState('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={edition.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateArticleState('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						selected={edition.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateArticleState('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							// onClick={() => setStatusPage(defaultArticleState)}
							onClick={() => handleReset}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={() => setStatusPage(edition)}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
