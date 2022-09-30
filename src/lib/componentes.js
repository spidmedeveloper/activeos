const componentes = {

    card: (title, body, footer, class_card, class_card_title, class_card_body, class_card_footer) => {
        return `
            <div class="card ${class_card}">
                <div class="card-header ${class_card_title}">${title}</div>
                <div class="card-body ${class_card_body}">${body}</div>
                <div class="card-footer ${class_card_footer}">${footer}</div>
            </div>
        `;
    }

}

module.exports = componentes