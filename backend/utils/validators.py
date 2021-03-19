from django.core.validators import RegexValidator


phone_number_validator = RegexValidator(r'(8[1-8][0-9]{6}|9[0-8][0-9]{6})', 'Invalid phone number.')

def file_validator(file):
    # TODO: find a file validator
    pass