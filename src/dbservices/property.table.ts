import { Service } from 'typedi';
import { PropertyModel, IProperty } from '../models/Property';
@Service()
export default class PropertyRepo {
  propertyCreate = async (data: IProperty): Promise<IProperty> => {
    const property = await new PropertyModel(data).save();
    return property;
  };

  findUserByEmailAndPhone = async (
    email: string,
    phone: string
  ): Promise<IProperty> => {
    const property = await PropertyModel.findOne({ email, phone });
    return property;
  };

  findPropertybyId = async (id: string): Promise<IProperty> => {
    const property = await PropertyModel.findById(id);
    return property;
  };

  findPropertyByUserId = async (
    user_id: string,
    property_id: string
  ): Promise<IProperty> => {
    const property = await PropertyModel.findOne({
      user: user_id,
      _id: property_id,
    });
    return property;
  };

  findPropertyByUserIdOnly = async (
    user_id: string
  ): Promise<Array<IProperty>> => {
    const property = await PropertyModel.find({
      user: user_id,
    });
    return property;
  };

  filterByAddress = async (
    str: string,
    perPage: number
  ): Promise<Array<IProperty>> => {
    const filter_property = await PropertyModel.find({
      address: { $regex: '.*' + str + '.*' },
      is_published: true,
    })
      .populate('user')
      .limit(perPage || 10);
    return filter_property;
  };

  deleteProperty = async (id: string) => {
    const _delete = await PropertyModel.deleteOne({ _id: id });
    return _delete.deletedCount;
  };

  updateProperty = async (id: string, data: any): Promise<IProperty> => {
    const update = await PropertyModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return update;
  };

  findPropertyByEmailSentAnd20Minutes = async (): Promise<Array<IProperty>> => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - 120);
    const properties = await PropertyModel.find({
      createdAt: { $gte: d, $lte: Date.now() },
      email_sent: false,
      is_published: true,
    }).populate('user');
    return properties;
  };
}
