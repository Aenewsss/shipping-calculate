const express = require('express')
const router = express.Router()
const { calcularPrecoPrazo } = require('correios-brasil')

router.get("/frete", (req, res) => {
    let valor = ''
    let cep = ''
    let prazo = ''
    res.status(200).render("frete", { valor: valor, cep: cep, prazo: prazo})
})

router.post("/frete", async (req, res) => {
    let servico = (req.body.select)
    let cep = (req.body.cep)
    let args = {
        sCepOrigem: '05180150',
        sCepDestino: cep,
        nVlPeso: '1',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '20',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'],
        nVlDiametro: '0',
    };
    let valor = 'Valor do frete: '
    let prazo = 'Prazo de entrega: '
    await calcularPrecoPrazo(args).then((response) => {
        if (servico == '04014') {
            valor += (response[0].Valor)
            prazo += response[0].PrazoEntrega
            res.render("frete", { valor: valor, cep: cep, prazo: prazo})
        } else if (servico == '04510') {
            valor += `${response[1].Valor} reais`
            prazo += `${response[1].PrazoEntrega} dias`
            res.render("frete", { valor: valor, cep: cep,prazo: prazo })
        } else {
            res.render("frete", { valor: 'O serviço escolhido é inválido', cep: cep, prazo: ''})
        }
    }).catch(() => {
        res.render("frete", { valor: 'O frete escolhido é inválido', cep: cep, prazo: ''})
    })
})

module.exports = router