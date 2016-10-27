Feature: Just a simple example
  As a user
  I would like to see some examples of usage
  So I can get going quickly

# Our first scenario, It simply loads the skutter github page and checks the banner is visible.
Scenario: 1. Loading a Page

  # This given is a 'custom' step, and therefore it is loaded from the ./steps/example-steps file
  Given I am viewing the github-landing page

  # This then is built in, it is using the 'skutter-header' structure name in the ./pages/github-landing file
  # to determine what it needs to look for in the html.
  Then the skutter-header is visible


  @just
# Our second scenario, leaning on more skutter built in steps to perform user interactions
Scenario: 2. Searching the github site
  Given I am viewing the github-landing page
  When I type "example" into the repo-search-box textbox
  And I type enter into the repo-search-box textbox
  Then I am viewing the github-search-results page
  And the repo-link text is "skutter"
