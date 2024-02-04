import { useMemo } from "react";
import PropTypes from "prop-types";
import {
	Button as AriaButton,
	RangeCalendar as AriaRangeCalendar,
	CalendarCell as AriaCalendarCell,
	CalendarGrid as AriaCalendarGrid,
	CalendarGridBody as AriaCalendarGridBody,
	CalendarGridHeader as AriaCalendarGridHeader,
	CalendarHeaderCell as AriaCalendarHeaderCell,
	DateInput,
	DateRangePicker as AriaDateRangePicker,
	Dialog as AriaDialog,
	Group,
	Popover as AriaPopover,
	DateSegment,
} from "react-aria-components";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Label from "../Label";
import ErrorMessage from "../ErrorMessage";
import useUserQuery from "../../queries/user/useUserQuery.hook";
import Text from "../Text";
import { FormattedMessage } from "react-intl";
import { getLocalTimeZone, isToday, today } from "@internationalized/date";
import dayjs from "dayjs";
import { useDateFormatter } from "@react-aria/i18n";
import Stack from "../Stack";
import DateRangePickerPreset from "./DateRangePickerPreset";
import Cluster from "../Cluster";
import useResponsive from "../../hooks/useResponsive.hook";

const DateRangePicker = ({
	label,
	errorMessage,
	tooltip,
	isOptional,
	isRequired,
	description,
	onChange,
	...props
}) => {
	const { data: user } = useUserQuery();
	const timezone = useMemo(() => user?.timezone || getLocalTimeZone(), [user]);
	const now = today(timezone);
	const lastWeek = { start: now.subtract({ days: 7 }), end: now };
	const lastMonth = { start: now.subtract({ months: 1 }), end: now };
	const lastThreeMonths = { start: now.subtract({ months: 3 }), end: now };
	const lastYear = { start: now.subtract({ years: 1 }), end: now };
	const { isMobile } = useResponsive();
	const monthDateFormatter = useDateFormatter({
		month: "long",
		year: "numeric",
		timeZone: timezone,
	});

	const handleChangeDate = (dates) => {
		const formattedDates = {
			start: dayjs(dates.start).format("YYYY-MM-DD"),
			end: dayjs(dates.end).format("YYYY-MM-DD"),
		};
		onChange && onChange(formattedDates);
	};

	return (
		<DateRangePickerStyled
			{...props}
			pageBehavior="single"
			isInvalid={props.isInvalid || !!errorMessage}
			onChange={handleChangeDate}
			shouldCloseOnSelect={false}
		>
			<Label
				isOptional={isOptional}
				isRequired={isRequired}
				tooltip={tooltip}
				description={description}
			>
				{label}
			</Label>
			<InputWrapper>
				<TriggerPopOverButton variant="ghost">
					<CalendarIcon icon={icon({ name: "calendar", style: "solid" })} />
					<InputDate slot="start">
						{(segment) => <DateSegment segment={segment} />}
					</InputDate>
					<InputArrowIcon
						aria-hidden="true"
						icon={icon({ name: "arrow-right-long", style: "solid" })}
					/>
					<InputDate slot="end">
						{(segment) => <DateSegment segment={segment} />}
					</InputDate>
				</TriggerPopOverButton>
			</InputWrapper>
			<Popover>
				<Dialog>
					<Stack gap="1.5rem">
						<RangeCalendar visibleDuration={{ months: isMobile ? 1 : 2 }}>
							{({ state }) => (
								<>
									<HeadingWrapper>
										<HeadingLeft>
											<ArrowButton slot="previous">
												<ArrowIcon
													icon={icon({
														name: "arrow-left",
														style: "solid",
													})}
												/>
											</ArrowButton>
											<HeadingDate>
												{monthDateFormatter.format(
													state.visibleRange.start.toDate(state.timeZone)
												)}
											</HeadingDate>
										</HeadingLeft>
										<HeadingDateMobile>
											{monthDateFormatter.format(
												state.visibleRange.start.toDate(state.timeZone)
											)}
										</HeadingDateMobile>
										<HeadingRight>
											<HeadingDate>
												{monthDateFormatter.format(
													state.visibleRange.start
														.add({ months: 1 })
														.toDate(state.timeZone)
												)}
											</HeadingDate>

											<ArrowButton slot="next">
												<ArrowIcon
													icon={icon({
														name: "arrow-right",
														style: "solid",
													})}
												/>
											</ArrowButton>
										</HeadingRight>
									</HeadingWrapper>
									<CalendarGrids>
										<CalendarGrid>
											<AriaCalendarGridHeader>
												{(day) => (
													<CalendarHeaderCell>{day}</CalendarHeaderCell>
												)}
											</AriaCalendarGridHeader>
											<CalendarGridBody>
												{(date) => (
													<CalendarBodyCell date={date}>
														{({ date }) => (
															<CalendarBodyCellInner
																isTodayDate={isToday(date, timezone)}
															>
																{date.day}
															</CalendarBodyCellInner>
														)}
													</CalendarBodyCell>
												)}
											</CalendarGridBody>
										</CalendarGrid>
										{!isMobile && (
											<CalendarGrid offset={{ months: 1 }}>
												<AriaCalendarGridHeader>
													{(day) => (
														<CalendarHeaderCell>{day}</CalendarHeaderCell>
													)}
												</AriaCalendarGridHeader>
												<CalendarGridBody>
													{(date) => (
														<CalendarBodyCell date={date}>
															{({ date }) => (
																<CalendarBodyCellInner
																	isTodayDate={isToday(date, timezone)}
																>
																	{date.day}
																</CalendarBodyCellInner>
															)}
														</CalendarBodyCell>
													)}
												</CalendarGridBody>
											</CalendarGrid>
										)}
									</CalendarGrids>
								</>
							)}
						</RangeCalendar>
						<Cluster gap="0.5rem" align="center">
							<DateRangePickerPreset value={lastWeek}>
								<FormattedMessage defaultMessage="7 derniers jours" />
							</DateRangePickerPreset>
							<DateRangePickerPreset value={lastMonth}>
								<FormattedMessage defaultMessage="30 derniers jours" />
							</DateRangePickerPreset>
							<DateRangePickerPreset value={lastThreeMonths}>
								<FormattedMessage defaultMessage="90 derniers jours" />
							</DateRangePickerPreset>
							<DateRangePickerPreset value={lastYear}>
								<FormattedMessage defaultMessage="Depuis 1 an" />
							</DateRangePickerPreset>
							<DateRangePickerPreset>
								<FormattedMessage defaultMessage="Depuis le début" />
							</DateRangePickerPreset>
						</Cluster>
					</Stack>
				</Dialog>
			</Popover>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			{timezone && (
				<Text variant="bodyS" color="--neutral500" slot="description">
					{timezone}
				</Text>
			)}
		</DateRangePickerStyled>
	);
};

const DateRangePickerStyled = styled(AriaDateRangePicker)`
	display: flex;
	max-width: 21.25rem;
	flex-direction: column;
	row-gap: 0.5rem;
`;
const InputWrapper = styled(Group)`
	background-color: var(--white);
	border-radius: var(--r-s);
	border: solid 1px var(--neutral200);

	&[data-focus-within] {
		transition-duration: 0.2s;
		border-color: var(--primary);
		outline: 0.25rem var(--primary50) solid;
	}

	&[data-disabled] {
		opacity: 0.5;
		pointer-events: none;
	}
`;
const Popover = styled(AriaPopover)`
	width: fit-content;
	max-width: calc(100vw - 2rem);
`;
const InputDate = styled(DateInput)`
	display: flex;
	align-items: center;
	column-gap: 0.25rem;
	cursor: text;
`;
const TriggerPopOverButton = styled(AriaButton)`
	padding: 0.625rem;
	border: none;
	background: none;
	cursor: pointer;
	width: 100%;
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
`;
const IconButton = styled(AriaButton)`
	padding: 0;
	border: none;
	background: none;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;
const CalendarIcon = styled(FontAwesomeIcon)`
	font-size: 1rem;
	color: var(--neutral500);
`;
const Dialog = styled(AriaDialog)`
	padding: 1rem;
	background-color: var(--white);
	border-radius: var(--r-m);
	box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.05);
`;
const RangeCalendar = styled(AriaRangeCalendar)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
`;
const ArrowButton = styled(IconButton)`
	padding: 0.5rem;
`;
const ArrowIcon = CalendarIcon;
const Heading = styled.div`
	display: flex;
	align-items: center;
	column-gap: 0.25rem;
	flex: 1;
`;
const HeadingLeft = styled(Heading)`
	justify-content: start;

	${({ theme }) => theme.mediaQueries.tabletAndUp} {
		padding-right: 2rem;
	}
`;
const HeadingRight = styled(Heading)`
	justify-content: end;

	${({ theme }) => theme.mediaQueries.tabletAndUp} {
		padding-left: 2rem;
	}
`;
const HeadingDateBase = css`
	font-size: var(--fs-body-l);
	font-weight: var(--fw-semibold);
	line-height: var(--lh-body-l);
	margin-inline: auto;
	text-transform: capitalize;
`;
const HeadingDate = styled.span`
	display: none;
	${HeadingDateBase}
	${({ theme }) => theme.mediaQueries.tabletAndUp} {
		display: block;
	}
`;
const HeadingDateMobile = styled.span`
	${HeadingDateBase}

	${({ theme }) => theme.mediaQueries.tabletAndUp} {
		display: none;
	}
`;
const HeadingWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 2rem;
`;
const CalendarGridBody = styled(AriaCalendarGridBody)`
	text-align: center;
	vertical-align: middle;
`;
const CalendarHeaderCell = styled(AriaCalendarHeaderCell)`
	font-size: var(--fs-body-s);
	color: var(--neutral500);
	font-weight: var(--fw-normal);
`;
const CalendarBodyCellInner = styled.span`
	width: 2rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--black);
	font-size: var(--fs-body-m);
	font-weight: var(--fw-semibold);
	border-radius: var(--r-s);

	${({ isTodayDate }) =>
		isTodayDate &&
		css`
			position: relative;
			&::before {
				content: "";
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 0.25rem;
				height: 0.25rem;
				border-radius: var(--r-full);
				background-color: var(--primary);
			}
		`}
`;
const CalendarBodyCell = styled(AriaCalendarCell)`
	width: 2.25rem;
	height: 2rem;
	display: flex;
	justify-content: start;
	cursor: pointer;

	&:hover > ${CalendarBodyCellInner} {
		background-color: var(--primary50);
		color: var(--primary);
	}

	&[data-focus-visible]
		> ${CalendarBodyCellInner},
		&[data-focused]
		> ${CalendarBodyCellInner} {
		outline: solid 0.25rem var(--primary50);
	}
	&[data-focus-visible],
	&[data-selected]:not([data-selection-start]):not([data-selection-end])
		> ${CalendarBodyCellInner},
		&[data-focused],
	&[data-selected]:not([data-selection-start]):not([data-selection-end])
		> ${CalendarBodyCellInner} {
		outline-color: var(--primary200);
	}

	outline-color: var(--primary200);
	&[data-selected] {
		background-color: var(--primary50);
	}
	&[data-selected]:not([data-selection-start]):not([data-selection-end])
		> ${CalendarBodyCellInner} {
		background-color: var(--primary50);
		color: var(--primary);
	}
	&[data-selection-start]
		> ${CalendarBodyCellInner},
		&[data-selection-end]
		> ${CalendarBodyCellInner} {
		background-color: var(--primary);
		color: var(--white);
	}
	&[data-selection-start] {
		background: linear-gradient(80deg, transparent 30%, var(--primary50) 0%);
	}
	&[data-selection-end] {
		background: linear-gradient(80deg, var(--primary50) 70%, transparent 0%);
	}

	&[data-disabled] > ${CalendarBodyCellInner} {
		color: var(--neutral500);
		opacity: 0.5;
	}

	&[data-outside-month] {
		display: none;
	}
`;
const CalendarGrid = styled(AriaCalendarGrid)`
	border-collapse: separate;
	border-spacing: 0 0.25rem;

	td,
	th {
		padding: 0;
	}

	tr {
		margin-bottom: 0.25rem;
	}

	tr > td:first-child > ${CalendarBodyCell} {
		border-top-left-radius: var(--r-s);
		border-bottom-left-radius: var(--r-s);
	}
	tr > td:last-child > ${CalendarBodyCell} {
		border-top-right-radius: var(--r-s);
		border-bottom-right-radius: var(--r-s);
	}
`;
const InfoIcon = styled(FontAwesomeIcon)`
	font-size: 0.5rem;
	color: var(--neutral500);
`;
const TimezoneWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 0.25rem;
`;
const CalendarGrids = styled.div`
	display: flex;
	justify-content: center;
	column-gap: 2rem;
`;
const InputArrowIcon = styled(FontAwesomeIcon)`
	width: 1rem;
	height: 1rem;
	color: var(--neutral500);
`;

/* 
    cf. React aria DateRangePicker: https://react-spectrum.adobe.com/react-aria/DateRangePicker.html#props
    cf. React aria RangeCalendar: https://react-spectrum.adobe.com/react-aria/RangeCalendar.html#props
*/
DateRangePicker.propTypes = {
	visibleDuration: PropTypes.shape({
		days: PropTypes.number,
		months: PropTypes.number,
		years: PropTypes.number,
	}),
	minValue: PropTypes.string,
	maxValue: PropTypes.string,
	placeholderValue: PropTypes.string,
	isDateUnavailable: PropTypes.func,
	isDisabled: PropTypes.bool,
	isReadOnly: PropTypes.bool,
	autoFocus: PropTypes.bool,
	focusedValue: PropTypes.object,
	defaultFocusedValue: PropTypes.object,
	isInvalid: PropTypes.bool,
	pageBehavior: PropTypes.oneOf(["visible", "unit"]),
	value: PropTypes.object,
	defaultValue: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
	onChange: PropTypes.func,
	onOpenChange: PropTypes.func,
	label: PropTypes.string,
	errorMessage: PropTypes.string,
	tooltip: PropTypes.node,
	isOptional: PropTypes.bool,
	isRequired: PropTypes.bool,
	description: PropTypes.string,
};

export default DateRangePicker;
