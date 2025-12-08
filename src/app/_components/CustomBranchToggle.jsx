"use client";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const CustomBranchToggle = ({ value, onChange }) => {
    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
            aria-label="edge type"
            sx={{
                width: '100%',
                border: '1px solid var(--translucent-purple)',
                borderRadius: '25px',
                backgroundColor: 'var(--white-gray)',
                overflow: 'hidden',
                display: 'flex',
                backgroundColor: 'transparent',
                '& .MuiToggleButtonGroup-grouped': {
                    margin: 0,
                    border: 0,
                    borderRadius: 0,
                    flex: 1,
                    '&:not(:first-of-type)': {
                        borderLeft: '1px solid var(--translucent-purple)',
                    },
                    '&:first-of-type': {
                        borderTopLeftRadius: '15px',
                        borderBottomLeftRadius: '15px',
                    },
                    '&:last-of-type': {
                        borderTopRightRadius: '15px',
                        borderBottomRightRadius: '15px',
                    },
                },
                '& .MuiToggleButton-root': {
                    padding: '12px',
                    fontWeight: 500,
                    fontFamily: '"CreatoDisplay", sans-serif',
                    textTransform: 'none',
                    color: 'var(--primary-text-color)',
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease-out',
                    border: 'none',
                    '&:hover': {
                        backgroundColor: 'rgba(142, 16, 231, 0.1)',
                    },
                    '&.Mui-selected': {
                        background: 'linear-gradient(90deg, rgba(142, 16, 231, 1) 0%, rgba(220, 130, 255, 1) 51%, rgba(142, 16, 231, 1) 100%)',
                        backgroundPosition: 'left bottom',
                        backgroundSize: '200% 100%',
                        color: 'white',
                        '&:hover': {
                            backgroundPosition: 'right bottom',
                        }
                    }
                }
            }}
        >
            <ToggleButton value="regular">
                Régulier
            </ToggleButton>
            <ToggleButton value="conditional">
                Conditionnelle
            </ToggleButton>
            <ToggleButton value="history">
                Historique
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default CustomBranchToggle;
