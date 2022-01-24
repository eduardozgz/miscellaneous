This was created to remove unnecessary data from other huge OpenAPI specifications that would slow down SwaggerUI

This script loads a `input.yaml` file, and with the references specified in the `used` const, will produce a `output.yaml` file that doesn't have anything that can't be reached by the initial `used` references

---
#yaml #js #swagger #openapi #remove #ref #recursive