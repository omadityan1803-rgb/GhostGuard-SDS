import numpy as np
import pandas as pd

def generate_human_sample():
    return {
        # Mouse features
        'mouse_entropy': np.random.beta(5, 2),        # Humans: high entropy
        'mouse_avg_speed': np.random.normal(0.3, 0.1),
        'mouse_direction_changes': np.random.poisson(25),
        'mouse_straight_line_ratio': np.random.beta(2, 5),  # Low = curved
        'mouse_pause_count': np.random.poisson(8),

        # Keyboard features
        'key_avg_dwell': np.random.normal(120, 30),   # ms
        'key_avg_flight': np.random.normal(150, 50),
        'key_rhythm_consistency': np.random.beta(3, 2),
        'key_backspace_ratio': np.random.beta(2, 8),  # Humans do backspace
        'key_typing_speed': np.random.normal(55, 20), # WPM

        # Scroll features
        'scroll_depth': np.random.beta(3, 2),
        'scroll_avg_speed': np.random.normal(0.5, 0.2),
        'scroll_direction_changes': np.random.poisson(4),
        'scroll_reading_pattern': np.random.beta(4, 2),

        # Session
        'session_duration': np.random.normal(45000, 20000),  # ms
        'request_timing_variance': np.random.exponential(500),

        'label': 1  # Human
    }

def generate_bot_sample():
    bot_type = np.random.choice(['headless', 'selenium', 'api_direct', 'smart_bot'], 
                                 p=[0.4, 0.3, 0.2, 0.1])
    if bot_type == 'headless':
        return {
            'mouse_entropy': np.random.beta(1, 5),        # Very low
            'mouse_avg_speed': 0,
            'mouse_direction_changes': 0,
            'mouse_straight_line_ratio': 1.0,             # Perfect lines
            'mouse_pause_count': 0,
            'key_avg_dwell': 0,
            'key_avg_flight': 0,
            'key_rhythm_consistency': 0,
            'key_backspace_ratio': 0,                     # No typos
            'key_typing_speed': 0,
            'scroll_depth': 0,
            'scroll_avg_speed': 0,
            'scroll_direction_changes': 0,
            'scroll_reading_pattern': 0,
            'session_duration': np.random.normal(500, 100),
            'request_timing_variance': np.random.normal(5, 2),
            'label': 0
        }
    elif bot_type == 'selenium':
        return {
            'mouse_entropy': np.random.beta(1, 3),
            'mouse_avg_speed': np.random.normal(2.0, 0.5),  # Too fast & straight
            'mouse_direction_changes': np.random.poisson(2),
            'mouse_straight_line_ratio': np.random.beta(8, 2),
            'mouse_pause_count': np.random.poisson(1),
            'key_avg_dwell': np.random.normal(50, 5),        # Too consistent
            'key_avg_flight': np.random.normal(50, 5),
            'key_rhythm_consistency': np.random.beta(1, 5),  # Too regular
            'key_backspace_ratio': 0,
            'key_typing_speed': np.random.normal(200, 20),   # Superhuman WPM
            'scroll_depth': np.random.choice([0, 1]),         # Jump to exact positions
            'scroll_avg_speed': np.random.normal(5, 1),
            'scroll_direction_changes': 0,
            'scroll_reading_pattern': 0,
            'session_duration': np.random.normal(2000, 500),
            'request_timing_variance': np.random.normal(10, 3),
            'label': 0
        }
    else:  # api_direct / smart_bot
        return {
            'mouse_entropy': np.random.beta(2, 4),
            'mouse_avg_speed': np.random.normal(0.1, 0.05),
            'mouse_direction_changes': np.random.poisson(3),
            'mouse_straight_line_ratio': np.random.beta(5, 3),
            'mouse_pause_count': np.random.poisson(2),
            'key_avg_dwell': np.random.normal(80, 10),
            'key_avg_flight': np.random.normal(80, 10),
            'key_rhythm_consistency': np.random.beta(1, 4),
            'key_backspace_ratio': np.random.beta(1, 20),
            'key_typing_speed': np.random.normal(120, 10),
            'scroll_depth': np.random.beta(2, 3),
            'scroll_avg_speed': np.random.normal(1.5, 0.5),
            'scroll_direction_changes': np.random.poisson(1),
            'scroll_reading_pattern': np.random.beta(1, 3),
            'session_duration': np.random.normal(5000, 1000),
            'request_timing_variance': np.random.normal(50, 20),
            'label': 0
        }

def generate_dataset(n_humans=5000, n_bots=5000):
    humans = [generate_human_sample() for _ in range(n_humans)]
    bots   = [generate_bot_sample()   for _ in range(n_bots)]
    df = pd.DataFrame(humans + bots).sample(frac=1).reset_index(drop=True)
    return df

if __name__ == '__main__':
    df = generate_dataset()
    df.to_csv('ml/training_data.csv', index=False)
    print(f"Generated {len(df)} samples. Class balance: {df['label'].value_counts().to_dict()}")
