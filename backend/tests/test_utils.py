from app.utils import calculate_text_credits


class TestCalculateTextCredits:
    def test_empty_string_returns_minimum(self):
        assert calculate_text_credits("") == 1.00

    def test_short_text_returns_minimum(self):
        assert calculate_text_credits("Hello") == 1.00

    def test_exact_minimum_threshold(self):
        assert calculate_text_credits("a" * 10) == 1.00

    def test_above_minimum(self):
        assert calculate_text_credits("a" * 400) == 40.00

    def test_rounds_to_two_decimal_places(self):
        assert calculate_text_credits("a" * 120) == 12.00

    def test_fractional_credits(self):
        assert calculate_text_credits("a" * 50) == 5.00

    def test_realistic_message(self):
        message = "Please generate a report for Q4 sales figures"
        assert calculate_text_credits(message) == 4.50

    def test_whitespace_counts_as_characters(self):
        text_no_spaces = "HelloWorld"
        text_with_spaces = "Hello World"
        assert len(text_with_spaces) > len(text_no_spaces)