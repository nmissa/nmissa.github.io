class Model {
    constructor(eventpump) {
        this.$event_pump = $('body');
    }

    read() {
        $.getJSON(
            "/publications.json",
            (data) => {
                this.$event_pump.trigger('model_read_success', [data])
            })
    }
}

class View {
    constructor() { }

    build_publications(publications) {
        let content = '';

        //clear the table
        $('.publications').empty();

        // confirm there are publications to show
        if (publications) {
            for (let i = 0, l = publications.length; i < l; i++) {
                let authors = publications[i].author;
                let authors_entry = "";
                for( let j=0; j < authors.length;j++) {
                    console.log(authors[j])
                    authors_entry+=`<span class="author mr-2">${authors[j]}</span>`
                }
                let publisher = "";
                if(publications[i].hasOwnProperty('publisher'))
                {
                    publisher = publications[i].publisher
                } else {
                    publisher = publications[i].booktitle
                }

                console.log(authors_entry)
                content=`
                <div class="publication-item mb-4">
                    <div class="publication-header">
                        <span class="publication-title">${ publications[i].title  }</span>
                        <span class="publication-type ${publications[i].ENTRYTYPE}">${ publications[i].ENTRYTYPE}</span>
                    </div>
                    <div class="publication-authors">${authors_entry}</div>
                    <div class="publication-details">
                        <span class="journal">${publisher}</span>
                        <span class="year">(${publications[i].year})</span>
                    </div>
                </div>`
                $(`#year-${publications[i].year} .publications`).append(content);
            }
            
        }
    }
}

class Controller {
    constructor(model, view) {
        this.$event_pump = $('body');
        this.model = model;
        this.view = view;

        // set up the events
        this.$event_pump.on('model_read_success', (e, data) => {
            this.view.build_publications(data);
        });

        // read the data from the model
        this.model.read()
    }
}


const app = new Controller(new Model(), new View());