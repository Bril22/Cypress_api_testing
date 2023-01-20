describe('API test', () => {
  it('Test GET request', () => {
    cy.request('GET', 'https://api.publicapis.org/entries')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('count')
        expect(response.body.count).to.be.a('number')
      })
  })

  it('Test category animals', () => {
    cy.request('GET', 'https://api.publicapis.org/entries?category=Animals')
      .then((response) => {
        expect(response.body.count).to.be.a('number')
        expect(response.body.entries).to.be.an('array')
      })
  })

  it('Test search by title', () => {
    cy.request('GET', 'https://api.publicapis.org/entries?title=at')
      .then((response) => {
        const entries = response.body.entries
        entries.forEach(entry => {
          expect(entry.API.toLowerCase()).to.include('at')
        })
      })
  })

  it('Test search by description', () => {
    cy.request('GET', 'https://api.publicapis.org/entries?description=api')
      .then((response) => {
      expect(response.body.entries[0].Description).to.contain('API')
      })
  })

  it('Test auth parameter', () => {
    cy.request('https://api.publicapis.org/entries')
      .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.entries[0].Auth).to.satisfy((auth) => {
              return auth === 'apiKey' || auth === null
          })
      })
  })

  it('Test HTTPS parameter', () => {
    cy.request('https://api.publicapis.org/entries')
      .then((response) => {
          expect(response.body.entries[0].HTTPS).to.be.oneOf([true, false])
      })
  })

  it('Test CORS parameter', () => {
    cy.request('https://api.publicapis.org/entries')
      .then((response) => {
        expect(response.status).to.eq(200)
            for(let i=0; i<response.body.entries.length; i++) {
              expect(response.body.entries[i].Cors).to.match(/yes|no|unknown/)
            }
      })
  })

  it('GET request to https://api.publicapis.org/entries', () => {
    cy.request({
        method: 'GET',
        url: 'https://api.publicapis.org/entries',
        qs: {
            category: 'finance'
        }
      })
      .then((response) => {
        for(let i=0; i<response.body.entries.length; i++) {
            expect(response.body.entries[i].Category.toLowerCase()).to.eq('finance')
        }
      })
  })

})

