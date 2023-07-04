import * as React from 'react';
import {Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {TutorialTagStore} from '../../utils/zustand.store';
import {Checkbox, ListItemText} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

// Change Style of selected Item
function getStyles(tagName: string, tagsChip: readonly string[], theme: Theme) {
	return {
		fontWeight:
			tagsChip.indexOf(tagName) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

export default function TagsList() {
	// Zustand Store
	const {defaultTags, storeSelectedTags} = TutorialTagStore();

	const theme = useTheme();
	const [tagsChip, setTagsChip] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof tagsChip>) => {
		const {
			target: {value},
		} = event;
		setTagsChip(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	React.useEffect(() => {
		storeSelectedTags(tagsChip);
	}, [tagsChip]);

	return (
		<div>
			<FormControl sx={{m: 1, width: 300}}>
				<InputLabel id="chip-tag">Select Tags</InputLabel>
				<Select
					labelId="chip-tag"
					id="chip-tag"
					multiple
					value={tagsChip}
					onChange={handleChange}
					input={
						<OutlinedInput
							id="chip-tag"
							label="Select Tags"
						/>
					}
					renderValue={(selected) => (
						<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
							{selected.map((value) => (
								<Chip
									key={value}
									label={value}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}>
					{defaultTags.map((tagName) => (
						<MenuItem
							key={tagName}
							value={tagName}
							aria-label={tagName}
							style={getStyles(tagName, tagsChip, theme)}>
							<Checkbox checked={tagsChip.indexOf(tagName) > -1} />
							<ListItemText primary={tagName} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
