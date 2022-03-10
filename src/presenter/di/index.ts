import Infrastructure from "./Infrastructure";
import Repository from "./Repository";
import Service from "./Service";

const infrastructure = Infrastructure();
const repository = Repository(infrastructure);
const service = Service(repository);

export default {
  service
};
