import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { findRecord } from '@ember-data/json-api/request';

export default class RentalRoute extends Route {
  @service store;

  beforeModel(transition) {
    console.log("RentalRoute.beforeModel has started", transition);
  }

  // async-await version.
  async model(params) {
    // Carefully interpre the resulting behaviour of this method. It is
    // simply NOT called at all if the user came to the detail page by
    // clicking the link at the top page, because in that case the
    // transition is fired by LinkTo tag. The `model` property is given
    // as a member of argument (i.e. this.args).
    //  See `app/components/rental.hbs`, if you want to check.
    console.log("RentalRoute.model has started.", params);
    const {content} = await this.store.request(
      findRecord('rental', params.rental_id),
    );
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("We have done the HARD task!");
        resolve(true);
      }, 3000);
    });
    return content.data;
  }

  /*
  // Non `async` and returns Promise version
  model(params) {
    console.log("RentalRoute.model has started.", params);
    return new Promise((resolve) => {
      this.store.request(findRecord('rental', params.rental_id)).then(
        ({content:{data}}) => {
          setTimeout(() => {
            console.log("resolved", data);
            resolve(data);
          }, 3000)
        }
      )
    });
  }
  */

  /*
  // async returns Promise version
  async model(params) {
    console.log("RentalRoute.model has started.", params);
    const {content} = await this.store.request(
      findRecord('rental', params.rental_id),
    );
    return new Promise((resolve) => {
      console.log("Promise has started.")
      setTimeout(() => {
        console.log("resolved");
        resolve(content.data);
      }, 3000);
    });
  }
  */

  afterModel(post, transition) {
    console.log("RentalRoute.afterModel has started", post, transition);
  }
}
