Feature: Booking tests

    Scenario: Should book tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user chooses a date
        When user chooses the time for movie
        When user chooses a seat
        When user clicks on the booking button
        When user clicks on the button to retrieve a booking code
        Then user receives the code and text "Электронный билет"

    Scenario: Should book some available tickets
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user chooses a date
        When user chooses the time for movie
        When user chooses the first seat
        When user chooses the second seat
        When user clicks on the booking button
        When user clicks on the button to retrieve a booking code
        Then user receives the code and text "Электронный билет"

    Scenario: Should try to book unavailable ticket, but unsuccessfully
        Given user is on page "http://qamid.tmweb.ru/client/index.php"
        When user chooses the date that has been choosen earlier
        When user choosea the time for the movie that has been choosen earlier
        When user chooses a seat that has been choosen earlier
        When user clicks on the booking button
        Then button for booking is inactive "true"
