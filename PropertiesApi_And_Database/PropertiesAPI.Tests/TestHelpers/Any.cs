using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;

namespace PropertiesAPI.Tests
{
    [ExcludeFromCodeCoverage]
    public static partial class Any
    {
        private static readonly Random _random = new Random();

        public static IEnumerable<T> Range<T>(Func<T> creationFunc, int count = 1) =>
            Enumerable.Range(0, count).Select(x => creationFunc()).ToList();

        public static bool Bool() => _random.Next(0, 1) == 1;

        public static decimal Decimal(int max = 1000) => _random.Next(0, max);

        public static short Short(int max = 100000) => (short)_random.Next(max);

        public static int Int(int max = 100000) => _random.Next(max);

        public static long Long() => _random.Next(0, int.MaxValue);

        public static double Double() => _random.Next(0, int.MaxValue);

        public static Guid Guid() => System.Guid.NewGuid();

        public static DateTime DateTime() => System.DateTime.UtcNow;

        public static TEnum Enumeration<TEnum>() where TEnum : Enum
        {
            var values = Enum.GetValues(typeof(TEnum)).Cast<TEnum>();
            return values.ToArray()[new Random().Next(values.Count())];
        }

#pragma warning disable CA1720 // Identifier contains type name
        public static string String(int length = 10)
#pragma warning restore CA1720 // Identifier contains type name
        {
            var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var stringBuilder = new StringBuilder();

            for (var i = 0; i < length; i++)
            {
                stringBuilder.Append(chars[_random.Next(chars.Length)]);
            }

            return stringBuilder.ToString();
        }

        public static string NonMatchingString(string s, int length = 10)
        {
            if (length == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(length), "cannot be zero");
            }

            var nonMatching = String(length);
            while (nonMatching == s)
            {
                nonMatching = String(length);
            }
            return nonMatching;
        }

        public static string[] StringArray(int length = 10)
        {
            var stringArray = new string[length];

            for (var i = 0; i < length; i++)
            {
                stringArray.SetValue(String(), i);
            }

            return stringArray;
        }

        public static byte[] ByteArray(int length = 100)
        {
            var byteArray = new byte[length];

            _random.NextBytes(byteArray);

            return byteArray;
        }

        public static IEnumerable<Property> Properties(int count = 3)
        {
            var properties = new List<Property>();
            for(var i=0; i<count; i++)
            {
                properties.Add(Property());
            }
            return properties;
        }

        public static Property Property()
        =>
            new Property
            {
                PropertyId = Long(),
                AddressId = Int(),
                YearBuilt = Int(),
                ListPrice = Double(),
                MonthlyRent = Double(),
                Address = Address()
            };

        public static Address Address() => new Address
        {
            AddressId = Int(),
            Address1 = String(),
            Address2 = String(),
            City = String(),
            Country = String(),
            County = String(),
            District = String(),
            State = String(),
            ZipCode = String(),
            ZipPlus4 = String()
        };     
         
        public static PropertyResponse PropertyResponse() => new PropertyResponse
        {
            PropertyId = Long(),
            IsSaved = Bool(),
            YearBuilt = Int(),
            ListPrice = Double(),
            MonthlyRent = Double(),
            Address = Address()
        };
    }
}
