'use strict';

var Person = function(person, popolo) {
  this._setKeys(person);
  this._popolo = popolo;
};

Person.prototype._setKeys = function(object) {
  var self = this;
  Object.keys(object).forEach(function (key) {
    self[key] = object[key];
  });
  this.links = this.links || [];
  // this.phone = this.contact('phone');
};

Person.prototype.link = function(type) {
  function sameNote(object) {
    return object.note && object.note === type;
  }

  var found = this.links.find(sameNote);
  if (found) {
    return found.url;
  }
};

Person.prototype.contact = function(type) {
  function sameType(object) {
    return object.type && object.type === type;
  }

  var found = this.contact_details.find(sameType);
  if (found) {
    return found.value;
  }
};

module.exports = Person;
// module Everypolitician
//   module Popolo
//     class Person < Entity
//       class Error < StandardError; end
//       def phone
//         contact('phone')
//       end
//
//       def fax
//         contact('fax')
//       end
//
//       def twitter
//         contact('twitter') || link('twitter')
//       end
//
//       def facebook
//         link('facebook')
//       end
//
//       def sort_name
//         name
//       end
//
//       def family_name
//         document.fetch(:family_name, nil)
//       end
//
//       def given_name
//         document.fetch(:given_name, nil)
//       end
//
//       def patronymic_name
//         document.fetch(:patronymic_name, nil)
//       end
//
//       def identifiers
//         document.fetch(:identifiers, [])
//       end
//
//       def images
//         document.fetch(:images, [])
//       end
//
//       def other_names
//         document.fetch(:other_names, [])
//       end
//
//       def sources
//         document.fetch(:sources, [])
//       end
//
//       def name_at(date)
//         return name unless key?(:other_names)
//         historic = other_names.select { |n| n.key?(:end_date) }
//         return name if historic.empty?
//         at_date = historic.select do |n|
//           n[:end_date] >= date && (n[:start_date] || '0000-00-00') <= date
//         end
//         return name if at_date.empty?
//         fail Error, "Too many names at #{date}: #{at_date}" if at_date.count > 1
//         at_date.first[:name]
//       end
//
//       def memberships
//         popolo.memberships.where(person_id: id)
//       end
//     end
//
//     class People < Collection
//       entity_class Person
//     end
//   end
// end
