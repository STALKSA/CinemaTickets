Feature: Search a course
    Scenario: Should search by text
        Given user is on "/navigation" page
        When user search by "тестировщик"
        Then user sees the course suggested "-40%ПрофессияPython-разработчик с нуля до middle12 месяцевстарт 4 сентября"